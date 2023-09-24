//process counter
class ProcessCounter {
    constructor() {
      this.getCount = 0;
      this.postCount = 0;
      this.deleteCount = 0;
      this.putCount = 0;
    }
  
    // Increment the count based on the call
    incrementCount(callType) {
      switch (callType) {
        case 'GET':
          this.getCount++;
          break;
        case 'POST':
          this.postCount++;
          break;
        case 'DELETE':
          this.deleteCount++;
          break;
        case 'PUT':
          this.putCount++;
          break;
        default:
          console.log('Invalid HTTP method:', callType);
      }
  
      // Call logCounts to log the process counts
      this.logCounts();
    }
  
    // Log the process counts
    logCounts() {
      console.log(
        'Processed Request Count> GET ',
        this.getCount,
        ', POST: ',
        this.postCount,
        ', DELETE: ',
        this.deleteCount,
        ', PUT: ',
        this.putCount

      );
    }
  }
  module.exports = ProcessCounter;
  