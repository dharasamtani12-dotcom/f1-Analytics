/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Driver {
  id: string;
  code: string;
  number: number;
  name: string;
  team: string;
  teamColor: string;
  country: string;
  countryCode: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  dnfCount: number;
  dnfBreakdown: {
    engine: number;
    mechanical: number;
    brakes: number;
    collision: number;
  };
  qualifyingAvg: number;
  racePaceDelta: number; // seconds vs benchmark
  championshipTitles: number;
  avatarUrl?: string;
}

export interface ConstructorTeam {
  id: string;
  name: string;
  shortName: string;
  leadPoints: number;
  totalPoints: number;
  color: string;
  engine: string;
  championships: number;
  carModel: string;
  drivers: string[];
}

export interface CircuitTrack {
  id: string;
  name: string;
  country: string;
  city: string;
  lengthKm: number;
  turns: number;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
  topSpeedTrap: number; // km/h
  downforceSetup: 'Maximum' | 'High' | 'Medium' | 'Low';
  svgPath: string;
  sectors: {
    id: string;
    name: string;
    benchmarkTime: string;
    x: number;
    y: number;
  }[];
}

export interface TyreCompoundData {
  compound: 'Soft' | 'Medium' | 'Hard' | 'Intermediate' | 'Wet';
  color: string;
  textColor: string;
  stintSharePercent: number;
  typicalStintLaps: string;
  gripIndex: number; // 1-100
  degradationRate: string;
  thermalWindow: string;
}

export interface CountryParticipation {
  country: string;
  records: number;
  flag: string;
  circuits: string;
}

export interface LiveTelemetryState {
  speed: number;
  rpm: number;
  throttle: number;
  brake: number;
  gear: number;
  drsActive: boolean;
  drsAvailable: boolean;
  gForceLateral: number;
  gForceLongitudinal: number;
  lapTimeCurrent: string;
  sector1: string;
  sector2: string;
  sector3: string;
  tireTemps: {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  };
}
