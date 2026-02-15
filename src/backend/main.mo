import Array "mo:core/Array";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  type Decision = {
    firmA : Bool; // true = Cooperate, false = Defect
    firmB : Bool;
  };

  type RoundResult = {
    round : Nat;
    decision : Decision;
    payoffA : Nat;
    payoffB : Nat;
    cumulativeA : Nat;
    cumulativeB : Nat;
  };

  type SimulationResult = {
    rounds : [RoundResult];
    totalA : Nat;
    totalB : Nat;
    sustainedCooperation : Bool;
  };

  type PayoffMatrix = {
    cooperateCooperateA : Nat;
    cooperateCooperateB : Nat;
    cooperateDefectA : Nat;
    cooperateDefectB : Nat;
    defectCooperateA : Nat;
    defectCooperateB : Nat;
    defectDefectA : Nat;
    defectDefectB : Nat;
  };

  var payoffMatrix = {
    cooperateCooperateA = 3;
    cooperateCooperateB = 3;
    cooperateDefectA = 0;
    cooperateDefectB = 5;
    defectCooperateA = 5;
    defectCooperateB = 0;
    defectDefectA = 1;
    defectDefectB = 1;
  };

  let simulationHistory = List.empty<SimulationResult>();

  public query ({ caller }) func getPayoffMatrix() : async PayoffMatrix {
    payoffMatrix;
  };

  public shared ({ caller }) func updatePayoffMatrix(matrix : PayoffMatrix) : async () {
    payoffMatrix := matrix;
  };

  public query ({ caller }) func getSimulationHistory() : async [SimulationResult] {
    simulationHistory.toArray();
  };

  func getPayoffs(choseCooperateA : Bool, choseCooperateB : Bool) : (Nat, Nat) {
    switch (choseCooperateA, choseCooperateB) {
      case (true, true) { (payoffMatrix.cooperateCooperateA, payoffMatrix.cooperateCooperateB) };
      case (true, false) { (payoffMatrix.cooperateDefectA, payoffMatrix.cooperateDefectB) };
      case (false, true) { (payoffMatrix.defectCooperateA, payoffMatrix.defectCooperateB) };
      case (false, false) { (payoffMatrix.defectDefectA, payoffMatrix.defectDefectB) };
    };
  };

  public shared ({ caller }) func runOneShot(strategyA : Text, strategyB : Text) : async SimulationResult {
    let decision = {
      firmA = strategyA == "Cooperate";
      firmB = strategyB == "Cooperate";
    };
    let (payoffA, payoffB) = getPayoffs(decision.firmA, decision.firmB);

    let result = {
      rounds = [{
        round = 1;
        decision;
        payoffA;
        payoffB;
        cumulativeA = payoffA;
        cumulativeB = payoffB;
      }];
      totalA = payoffA;
      totalB = payoffB;
      sustainedCooperation = decision.firmA and decision.firmB;
    };

    simulationHistory.add(result);
    result;
  };

  public shared ({ caller }) func runRepeatedGame(strategyA : Text, strategyB : Text, rounds : Nat) : async SimulationResult {
    let roundResults = List.empty<RoundResult>();
    var cumulativeA = 0;
    var cumulativeB = 0;
    var sustainedCooperation = true;

    for (i in Nat.range(1, rounds + 1)) {
      let decision = {
        firmA = strategyA == "Cooperate";
        firmB = strategyB == "Cooperate";
      };
      let (payoffA, payoffB) = getPayoffs(decision.firmA, decision.firmB);

      cumulativeA += payoffA;
      cumulativeB += payoffB;

      let roundResult = {
        round = i;
        decision;
        payoffA;
        payoffB;
        cumulativeA;
        cumulativeB;
      };

      roundResults.add(roundResult);

      if (not (decision.firmA and decision.firmB)) {
        sustainedCooperation := false;
      };
    };

    let result = {
      rounds = roundResults.toArray();
      totalA = cumulativeA;
      totalB = cumulativeB;
      sustainedCooperation;
    };

    simulationHistory.add(result);
    result;
  };

  public query ({ caller }) func getAnalysis() : async {
    nashEquilibrium : Text;
    dominantStrategyA : Text;
    dominantStrategyB : Text;
  } {
    // Nash equilibrium analysis (simplified)
    let nashEquilibrium = if (payoffMatrix.cooperateDefectA < payoffMatrix.defectDefectA and payoffMatrix.defectCooperateB < payoffMatrix.defectDefectB) {
      "Defect/Defect";
    } else {
      "Cooperate/Cooperate";
    };

    // Dominant strategy analysis (simplified)
    let dominantStrategyA = if (payoffMatrix.cooperateCooperateA < payoffMatrix.defectCooperateA and payoffMatrix.cooperateDefectA < payoffMatrix.defectDefectA) {
      "Defect";
    } else {
      "Cooperate";
    };

    let dominantStrategyB = if (payoffMatrix.cooperateCooperateB < payoffMatrix.cooperateDefectB and payoffMatrix.defectCooperateB < payoffMatrix.defectDefectB) {
      "Defect";
    } else {
      "Cooperate";
    };

    {
      nashEquilibrium;
      dominantStrategyA;
      dominantStrategyB;
    };
  };
};
