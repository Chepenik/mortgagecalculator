import { describe, it, expect } from 'vitest'
import {
  calculateMortgage,
  generateAmortizationSchedule,
  calculateTotalCostOfOwnership
} from './mortgageCalculations'

describe('calculateMortgage', () => {
  it('should calculate monthly payment correctly for standard 30-year mortgage', () => {
    // $320,000 loan at 6.25% for 30 years
    const monthlyPayment = calculateMortgage(320000, 6.25, 30)
    // Expected: approximately $1,970.46
    expect(monthlyPayment).toBeCloseTo(1970.46, 0)
  })

  it('should calculate higher monthly payment for 15-year mortgage', () => {
    const payment30 = calculateMortgage(320000, 6.25, 30)
    const payment15 = calculateMortgage(320000, 6.25, 15)
    expect(payment15).toBeGreaterThan(payment30)
  })

  it('should calculate lower payment for lower interest rate', () => {
    const paymentHigh = calculateMortgage(320000, 7.0, 30)
    const paymentLow = calculateMortgage(320000, 5.0, 30)
    expect(paymentLow).toBeLessThan(paymentHigh)
  })

  it('should handle edge case of very small loan', () => {
    const payment = calculateMortgage(10000, 5.0, 30)
    expect(payment).toBeGreaterThan(0)
    expect(payment).toBeLessThan(100)
  })
})

describe('generateAmortizationSchedule', () => {
  it('should generate schedule with positive total interest', () => {
    const result = generateAmortizationSchedule(
      320000, // loanAmount
      6.25,   // annualInterestRate
      30,     // loanTermYears
      4000,   // propertyTax
      2000,   // homeInsurance
      0,      // hoa
      0       // extraPayment
    )

    expect(result.totalInterest).toBeGreaterThan(0)
    expect(result.loanPayment).toBeCloseTo(1970.46, 0)
  })

  it('should reduce loan term with extra payments', () => {
    const withoutExtra = generateAmortizationSchedule(320000, 6.25, 30, 0, 0, 0, 0)
    const withExtra = generateAmortizationSchedule(320000, 6.25, 30, 0, 0, 0, 500)

    // With extra payments, should pay off faster (fewer schedule entries)
    expect(withExtra.schedule.length).toBeLessThan(withoutExtra.schedule.length)
    expect(withExtra.totalInterest).toBeLessThan(withoutExtra.totalInterest)
  })

  it('should include property tax and insurance in total monthly payment', () => {
    const result = generateAmortizationSchedule(
      320000, 6.25, 30,
      4000,   // $4000/year property tax
      2000,   // $2000/year insurance
      300,    // $300/month HOA
      0
    )

    // Total should be P&I + tax/12 + insurance/12 + HOA
    const expectedTotal = result.loanPayment + (4000/12) + (2000/12) + 300
    expect(result.totalMonthlyPayment).toBeCloseTo(expectedTotal, 2)
  })

  it('should end with zero balance', () => {
    const result = generateAmortizationSchedule(320000, 6.25, 30, 0, 0, 0, 0)
    const lastEntry = result.schedule[result.schedule.length - 1]
    expect(lastEntry.balance).toBeCloseTo(0, 0)
  })
})

describe('calculateTotalCostOfOwnership', () => {
  it('should calculate total cost correctly', () => {
    const result = calculateTotalCostOfOwnership(
      320000,   // loanAmount
      6.25,     // annualInterestRate
      30,       // loanTermYears
      4000,     // propertyTax
      2000,     // homeInsurance
      0,        // hoa
      1.5,      // homeAppreciationRate
      80000,    // downPayment
      [],       // additionalCosts
      0         // extraPayment
    )

    expect(result.totalCost).toBeGreaterThan(0)
    expect(result.actualLoanTermYears).toBe(30)
  })

  it('should reduce loan term with extra payments', () => {
    const withoutExtra = calculateTotalCostOfOwnership(
      320000, 6.25, 30, 4000, 2000, 0, 1.5, 80000, [], 0
    )
    const withExtra = calculateTotalCostOfOwnership(
      320000, 6.25, 30, 4000, 2000, 0, 1.5, 80000, [], 500
    )

    expect(withExtra.actualLoanTermYears).toBeLessThan(withoutExtra.actualLoanTermYears)
    expect(withExtra.totalCost).toBeLessThan(withoutExtra.totalCost)
  })

  it('should include additional costs in total', () => {
    const withoutAdditional = calculateTotalCostOfOwnership(
      320000, 6.25, 30, 4000, 2000, 0, 1.5, 80000, [], 0
    )
    const withAdditional = calculateTotalCostOfOwnership(
      320000, 6.25, 30, 4000, 2000, 0, 1.5, 80000,
      [{ name: 'PMI', value: 200 }], // $200/month additional
      0
    )

    expect(withAdditional.totalCost).toBeGreaterThan(withoutAdditional.totalCost)
  })

  it('should calculate net cost accounting for appreciation', () => {
    const result = calculateTotalCostOfOwnership(
      320000, 6.25, 30, 4000, 2000, 0, 3.0, 80000, [], 0
    )

    // Net cost should be less than total cost due to home appreciation
    expect(result.netCost).toBeLessThan(result.totalCost)
  })
})
