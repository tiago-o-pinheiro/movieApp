export class Formatter {
  public static currency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  public static date(value?: Date): string {
    if (!value) {
      return '';
    }
    return new Intl.DateTimeFormat('en-US').format(value);
  }
}
