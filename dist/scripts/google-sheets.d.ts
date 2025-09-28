export interface GoogleSheetsConfig {
    credentialsPath?: string;
    spreadsheetId?: string;
    sheetName?: string;
    keyColumn?: string;
    valueColumns?: string[];
    headerRow?: number;
}
export interface TranslationRow {
    key: string;
    [language: string]: string;
}
export declare class GoogleSheetsManager {
    private sheets;
    private config;
    constructor(config?: Partial<GoogleSheetsConfig>);
    /**
     * Google Sheets API 인증 및 초기화
     */
    authenticate(): Promise<void>;
    /**
     * 스프레드시트가 존재하는지 확인
     */
    checkSpreadsheet(): Promise<boolean>;
    /**
     * 워크시트가 존재하는지 확인하고, 없으면 생성
     */
    ensureWorksheet(): Promise<void>;
    /**
     * 헤더 행 추가
     */
    private addHeaders;
    /**
     * 로컬 번역 파일들을 읽어서 Google Sheets에 업로드
     */
    uploadTranslations(localesDir: string): Promise<void>;
    /**
     * Google Sheets에서 번역 데이터 다운로드
     */
    downloadTranslations(): Promise<TranslationRow[]>;
    /**
     * Google Sheets 데이터를 로컬 번역 파일로 저장
     */
    saveTranslationsToLocal(localesDir: string, languages?: string[]): Promise<void>;
    /**
     * 로컬 번역 파일들 읽기
     */
    private readLocalTranslations;
    /**
     * 양방향 동기화 - 로컬과 Google Sheets 간의 차이점 해결
     */
    syncTranslations(localesDir: string): Promise<void>;
    /**
     * 새로운 번역들을 Google Sheets에 추가
     */
    private uploadNewTranslations;
    /**
     * 새로운 번역들을 로컬 파일에 추가
     */
    private addTranslationsToLocal;
    /**
     * 스프레드시트 상태 확인
     */
    getStatus(): Promise<{
        spreadsheetId: string;
        sheetName: string;
        totalRows: number;
        lastUpdated?: string;
    }>;
}
export declare const defaultGoogleSheetsManager: GoogleSheetsManager;
//# sourceMappingURL=google-sheets.d.ts.map