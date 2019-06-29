﻿import { CodeModelCli, CommandParameter } from "./CodeModelCli"
import { ModuleMethod } from "./ModuleMap";

export function GenerateAzureCliReport(model: CodeModelCli) : string[] {
    var output: string[] = [];

    output.push("# Azure CLI Module Creation Report");
    output.push("");
    
    do
    {
        // this is a hack, as everything can be produced from main module now
        if (model.ModuleName.endsWith("_info"))
            continue;

        output.push("## " + model.GetCliCommand());
        output.push("");

        let methods: string[] = model.GetCliCommandMethods();
        for (let mi = 0; mi < methods.length; mi++)
        {
            // create, delete, list, show, update
            let method: string = methods[mi];

            output.push("### " + model.GetCliCommand() + " " + method);
            output.push("");
            output.push(method + " a " + model.GetCliCommand() +  ".");
            output.push("");

            output.push("|Option|Required|Type|Description|Target Path|");
            output.push("|------|--------|----|-----------|-----------|");

            // options
            let ctx = model.GetCliCommandContext(method);
            let params: CommandParameter[] = ctx.Parameters;
 
            // first parameters that are required
            params.forEach(element => {
                if (element.Type != "placeholder" && element.Required)
                {
                    output.push("|--" + element.Name + "|" + "YES" + "|" + element.Type + "|" + element.Help + "|" + element.Disposition + "|");
                }
            });

            // following by required parameters
            params.forEach(element => {
                if (element.Type != "placeholder" && !element.Required)
                {
                    output.push("|--" + element.Name + "|" + "NO" + "|" + element.Type + "|" + element.Help + "|" + element.Disposition + "|");
                }
            });
        }
    } while (model.NextModule());;

    return output;
}
