﻿/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CodeModelCli, CommandParameter } from "./CodeModelCli"
import { Indent, ToSnakeCase } from "../Common/Helpers";
import { MapModuleGroup, ModuleOption, ModuleMethod, Module } from "../Common/ModuleMap"

export function GenerateAzureCliValidators(model: CodeModelCli) : string[] {
    var output: string[] = [];

    output.push("# --------------------------------------------------------------------------------------------");
    output.push("# Copyright (c) Microsoft Corporation. All rights reserved.");
    output.push("# Licensed under the MIT License. See License.txt in the project root for license information.");
    output.push("# --------------------------------------------------------------------------------------------");
    output.push("");
    output.push("");
    output.push("def example_name_or_id_validator(cmd, namespace):");
    output.push("    from azure.cli.core.commands.client_factory import get_subscription_id");
    output.push("    from msrestazure.tools import is_valid_resource_id, resource_id");
    output.push("    if namespace.storage_account:");
    output.push("        if not is_valid_resource_id(namespace.RESOURCE):");
    output.push("            namespace.storage_account = resource_id(");
    output.push("                subscription=get_subscription_id(cmd.cli_ctx),");
    output.push("                resource_group=namespace.resource_group_name,");
    output.push("                namespace='Microsoft.Storage',");
    output.push("                type='storageAccounts',");
    output.push("                name=namespace.storage_account");
    output.push("            )");
    output.push("");
 
    return output;
}
