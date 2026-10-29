/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTyreWear,
  calculateDriverHeadToHead,
  calculateReliabilityIndex,
  calculateGearAndRpm,
  formatLapTime,
} from './telemetryCalculator';

test('calculateTyreWear calculates expected degradation and cliff thresholds', () => {
  const softEarly = calculateTyreWear('Soft', 5);
  assert.equal(softEarly.isPastCliff, false);
  assert.equal(softEarly.gripPercent > 80, true);

  const softLate = calculateTyreWear('Soft', 22);
  assert.equal(softLate.isPastCliff, true);
  assert.equal(softLate.recommendedPit, true);

  const hardLong = calculateTyreWear('Hard', 30);
  assert.equal(hardLong.isPastCliff, false);
  assert.equal(hardLong.timeLossSec > 0, true);
});

test('calculateDriverHeadToHead correctly finds deltas between two drivers', () => {
  const driverA = {
    id: 'ham',
    code: 'HAM',
    number: 44,
    name: 'Lewis Hamilton',
    team: 'Ferrari',
    teamColor: '#E8002D',
    country: 'UK',
    countryCode: 'GB',
    points: 31147,
    wins: 105,
    podiums: 201,
    poles: 104,
    fastestLaps: 67,
    dnfCount: 32,
    dnfBreakdown: { engine: 9, mechanical: 11, brakes: 4, collision: 8 },
    qualifyingAvg: 2.4,
    racePaceDelta: -0.14,
    championshipTitles: 7,
  };

  const driverB = {
    id: 'ver',
    code: 'VER',
    number: 1,
    name: 'Max Verstappen',
    team: 'Red Bull Racing',
    teamColor: '#3671C6',
    country: 'NL',
    countryCode: 'NL',
    points: 31126,
    wins: 63,
    podiums: 111,
    poles: 40,
    fastestLaps: 33,
    dnfCount: 31,
    dnfBreakdown: { engine: 12, mechanical: 8, brakes: 3, collision: 8 },
    qualifyingAvg: 2.1,
    racePaceDelta: -0.21,
    championshipTitles: 4,
  };

  const delta = calculateDriverHeadToHead(driverA, driverB);
  assert.equal(delta.pointsDelta, 21);
  assert.equal(delta.winsDelta, 42);
  assert.equal(delta.fasterDriver, 'Max Verstappen');
});

test('calculateReliabilityIndex handles boundary conditions accurately', () => {
  assert.equal(calculateReliabilityIndex(100, 10), 90);
  assert.equal(calculateReliabilityIndex(0, 0), 0);
  assert.equal(calculateReliabilityIndex(300, 30), 90);
  assert.equal(calculateReliabilityIndex(50, 0), 100);
});

test('calculateGearAndRpm maps speeds to appropriate F1 gear and RPM bounds', () => {
  const lowSpeed = calculateGearAndRpm(80);
  assert.equal(lowSpeed.gear, 1);
  assert.equal(lowSpeed.rpm > 4500, true);

  const highSpeed = calculateGearAndRpm(334);
  assert.equal(highSpeed.gear, 7);
  assert.equal(highSpeed.rpm > 10000, true);
  assert.equal(highSpeed.rpm <= 12500, true);

  const topSpeed = calculateGearAndRpm(360);
  assert.equal(topSpeed.gear, 8);
});

test('formatLapTime properly converts seconds into timing notation', () => {
  assert.equal(formatLapTime(72.492), '1:12.492');
  assert.equal(formatLapTime(65.05), '1:05.050');
  assert.equal(formatLapTime(0), '0:00.000');
});
