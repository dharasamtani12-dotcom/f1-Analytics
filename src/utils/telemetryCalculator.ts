/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Driver } from '../types/f1';

/**
 * Calculates tyre degradation time loss and residual grip percentage based on compound and stint age.
 */
export function calculateTyreWear(compound: 'Soft' | 'Medium' | 'Hard' | 'Intermediate', lapsDone: number) {
  const baseRates = {
    Soft: { wearRate: 0.12, initialGrip: 98, cliffLap: 18 },
    Medium: { wearRate: 0.07, initialGrip: 86, cliffLap: 28 },
    Hard: { wearRate: 0.035, initialGrip: 74, cliffLap: 40 },
    Intermediate: { wearRate: 0.09, initialGrip: 82, cliffLap: 24 },
  };

  const config = baseRates[compound] || baseRates.Medium;
  const isPastCliff = lapsDone > config.cliffLap;
  const cliffMultiplier = isPastCliff ? 1 + (lapsDone - config.cliffLap) * 0.25 : 1;

  const timeLossSec = Number((lapsDone * config.wearRate * cliffMultiplier).toFixed(3));
  const gripPercent = Math.max(15, Math.round(config.initialGrip - lapsDone * (1.8 * cliffMultiplier)));

  return {
    timeLossSec,
    gripPercent,
    isPastCliff,
    recommendedPit: isPastCliff || gripPercent < 35,
  };
}

/**
 * Evaluates head-to-head delta between two drivers
 */
export function calculateDriverHeadToHead(driverA: Driver, driverB: Driver) {
  const pointsDelta = driverA.points - driverB.points;
  const winsDelta = driverA.wins - driverB.wins;
  const podiumsDelta = driverA.podiums - driverB.podiums;
  const polesDelta = driverA.poles - driverB.poles;
  const qualiDelta = Number((driverA.qualifyingAvg - driverB.qualifyingAvg).toFixed(2));
  const paceDeltaSec = Number((driverA.racePaceDelta - driverB.racePaceDelta).toFixed(3));

  return {
    pointsDelta,
    winsDelta,
    podiumsDelta,
    polesDelta,
    qualiDelta,
    paceDeltaSec,
    fasterDriver: paceDeltaSec < 0 ? driverA.name : driverB.name,
  };
}

/**
 * Computes driver reliability index based on finishes vs DNFs
 */
export function calculateReliabilityIndex(totalRaces: number, dnfCount: number): number {
  if (totalRaces <= 0) return 0;
  const completionRate = ((totalRaces - dnfCount) / totalRaces) * 100;
  return Number(Math.max(0, Math.min(100, completionRate)).toFixed(1));
}

/**
 * Maps speed in km/h to approximate F1 8-speed transmission gear and RPM
 */
export function calculateGearAndRpm(speedKmH: number): { gear: number; rpm: number } {
  const safeSpeed = Math.max(0, Math.min(375, speedKmH));

  if (safeSpeed < 2) {
    return { gear: 1, rpm: 4200 };
  }

  const gearRatios = [
    { min: 0, max: 95, gear: 1, rpmBase: 4500, rpmFactor: 80 },
    { min: 95, max: 140, gear: 2, rpmBase: 8000, rpmFactor: 85 },
    { min: 140, max: 185, gear: 3, rpmBase: 8500, rpmFactor: 80 },
    { min: 185, max: 230, gear: 4, rpmBase: 8900, rpmFactor: 75 },
    { min: 230, max: 275, gear: 5, rpmBase: 9200, rpmFactor: 70 },
    { min: 275, max: 310, gear: 6, rpmBase: 9500, rpmFactor: 68 },
    { min: 310, max: 345, gear: 7, rpmBase: 9800, rpmFactor: 65 },
    { min: 345, max: 380, gear: 8, rpmBase: 10200, rpmFactor: 60 },
  ];

  const matched = gearRatios.find(g => safeSpeed >= g.min && safeSpeed < g.max) || gearRatios[gearRatios.length - 1];
  const delta = safeSpeed - matched.min;
  const rpm = Math.min(12500, Math.round(matched.rpmBase + delta * matched.rpmFactor));

  return {
    gear: matched.gear,
    rpm,
  };
}

/**
 * Formats seconds into MM:SS.mmm lap timing format
 */
export function formatLapTime(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return '0:00.000';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toFixed(3);
  const paddedSec = Number(seconds) < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${paddedSec}`;
}
