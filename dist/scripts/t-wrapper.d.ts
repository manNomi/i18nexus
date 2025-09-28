#!/usr/bin/env node
export interface ScriptConfig {
    sourcePattern?: string;
    processKorean?: boolean;
    processEnglish?: boolean;
    customTextRegex?: RegExp;
    translationImportSource?: string;
    generateKeys?: boolean;
    keyPrefix?: string;
    namespace?: string;
    outputDir?: string;
    dryRun?: boolean;
}
export declare class TranslationWrapper {
    private config;
    private translationKeys;
    constructor(config?: Partial<ScriptConfig>);
    private generateTranslationKey;
    private createUseTranslationHook;
    private shouldSkipPath;
    private processFunctionBody;
    private addImportIfNeeded;
    private isReactComponent;
    processFiles(): Promise<{
        processedFiles: string[];
        translationKeys: Map<string, string>;
    }>;
    generateTranslationFiles(outputDir?: string): Promise<void>;
}
export declare function runTranslationWrapper(config?: Partial<ScriptConfig>): Promise<void>;
//# sourceMappingURL=t-wrapper.d.ts.map