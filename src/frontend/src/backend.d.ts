import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RoundResult {
    cumulativeA: bigint;
    cumulativeB: bigint;
    decision: Decision;
    round: bigint;
    payoffA: bigint;
    payoffB: bigint;
}
export interface PayoffMatrix {
    defectDefectA: bigint;
    defectDefectB: bigint;
    cooperateDefectA: bigint;
    cooperateDefectB: bigint;
    cooperateCooperateA: bigint;
    cooperateCooperateB: bigint;
    defectCooperateA: bigint;
    defectCooperateB: bigint;
}
export interface Decision {
    firmA: boolean;
    firmB: boolean;
}
export interface SimulationResult {
    sustainedCooperation: boolean;
    totalA: bigint;
    totalB: bigint;
    rounds: Array<RoundResult>;
}
export interface backendInterface {
    getAnalysis(): Promise<{
        nashEquilibrium: string;
        dominantStrategyA: string;
        dominantStrategyB: string;
    }>;
    getPayoffMatrix(): Promise<PayoffMatrix>;
    getSimulationHistory(): Promise<Array<SimulationResult>>;
    runOneShot(strategyA: string, strategyB: string): Promise<SimulationResult>;
    runRepeatedGame(strategyA: string, strategyB: string, rounds: bigint): Promise<SimulationResult>;
    updatePayoffMatrix(matrix: PayoffMatrix): Promise<void>;
}
