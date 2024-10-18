//NOTE: いずれ画像等にも対応する場合はここに追加する
type FileType = 'pdf' | 'csv';

export class Base64Manager {
  private static base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  constructor(private readonly fileType: FileType) {}

  /** NOTE: ブラウザ環境で使用することを想定 */
  public async encodeForClient(binaryData: Blob): Promise<string> {
    const reader = new FileReader();
    reader.readAsDataURL(binaryData);

    switch (this.fileType) {
      case 'pdf':
      case 'csv': {
        return new Promise((resolve) => {
          reader.onload = () => {
            const { result } = reader;
            if (typeof result !== 'string') return;
            const truncated = result.replace(`data:application/${this.fileType};base64,`, '');
            resolve(truncated);
          };
        });
      }

      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = this.fileType;
        console.log(_);
        return '';
      }
    }
  }

  /** NOTE: nodeJS環境で使用することを想定 */
  public encode(binaryData: Buffer): string {
    switch (this.fileType) {
      case 'pdf':
      case 'csv':
        return binaryData.toString('base64');
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = this.fileType;
        console.log(_);
        return '';
      }
    }
  }

  /** NOTE: ブラウザ環境とnodeJS環境の両方で使用できる */
  public async decode(base64: string): Promise<Blob> {
    switch (this.fileType) {
      case 'pdf':
      case 'csv': {
        const res = await fetch(`data:application/${this.fileType};base64,${base64}`);
        const blob = res.blob();
        return blob;
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = this.fileType;
        console.log(_);
        return new Blob([]);
      }
    }
  }

  public static isBase64(base64: string): boolean {
    return this.base64regex.test(base64);
  }
}
