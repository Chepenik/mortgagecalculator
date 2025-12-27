import { z } from 'zod';

export const MortgageInputSchema = z.object({
  homePrice: z.number().min(0).max(100000000), // Max $100M
  downPayment: z.number().min(0).max(100000000),
  annualInterestRate: z.number().min(0).max(50), // Max 50%
  loanTermYears: z.number().min(1).max(50), // Max 50 years
  propertyTax: z.number().min(0).max(1000000),
  homeInsurance: z.number().min(0).max(1000000),
  hoa: z.number().min(0).max(1000000),
  extraPayment: z.number().min(0).max(1000000).optional(),
});

export type MortgageInput = z.infer<typeof MortgageInputSchema>;
