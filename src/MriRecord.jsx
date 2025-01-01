class MriRecord {
  constructor(reportId, timestamp, tumorType, imageUrl) {
    this.id = reportId;
    this.timestamp = timestamp;
    this.tumorType = tumorType;
    this.imageUrl = imageUrl;
  }
}

export default MriRecord;
