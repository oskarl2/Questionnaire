export function displayQuestionText(index: number, title?: string): string {
  return `${index}. ${title}`;
}

export function isLast(index: number, target: any[]): boolean {
  return index === target.length - 1;
}
