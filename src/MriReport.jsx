class MriReport {
  constructor(reportId = "", timestamp = "", tumorType = "", imageUrl = "", keyFeatures = [], recommendations = [], differentialDiagnoses = []) {
    this.id = reportId;
    this.timestamp = timestamp;
    this.tumorType = tumorType;
    this.imageUrl = imageUrl;
    this.keyFeatures = keyFeatures;
    this.recommendations = recommendations;
    this.differentialDiagnoses = differentialDiagnoses;
  }
}

export default MriReport;
