// Branded types for MajorCredits and MinorCredits

type Brand<K, T> = K & { __brand: T };

export interface MajorCredits {
  credits: number;
  // unique brand
  __brand: 'MajorCredits';
}

export interface MinorCredits {
  credits: number;
  // unique brand
  __brand: 'MinorCredits';
}

export function sumMajorCredits(
  subject1: MajorCredits,
  subject2: MajorCredits
): MajorCredits {
  const total: MajorCredits = { credits: subject1.credits + subject2.credits, __brand: 'MajorCredits' };
  return total;
}

export function sumMinorCredits(
  subject1: MinorCredits,
  subject2: MinorCredits
): MinorCredits {
  const total: MinorCredits = { credits: subject1.credits + subject2.credits, __brand: 'MinorCredits' };
  return total;
}
