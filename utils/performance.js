import http from 'k6/http'; // Importing the http module from k6
import { check, sleep } from 'k6'; // Importing check and sleep functions from k6
import { Trend, Rate, Counter, Gauge } from 'k6/metrics'; // Importing metrics from k6/metrics
const { htmlReport } = require("https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js");
// Set environment variable
const K6_PROMETHEUS_RW_TREND_STATS = "p(95),p(99),min,max";

// Define metrics
const responseTimeTrend = new Trend('response_time');
const successfulRequestRate = new Rate('successful_requests');
const totalRequests = new Counter('total_requests');
const failedRequestsCounter = new Counter('failed_requests');
const activeUsers = new Gauge('active_users');

// Define options for the test
export let options = {
  stages: [
    // Ramp up to 50 virtual users over 15 seconds
    { duration: '15s', target: 50 },
    // Maintain 60 virtual users for 60 seconds
    { duration: '60s', target: 60 },
    // Ramp down to 0 virtual users over 15 seconds
    { duration: '15s', target: 0 },
  ],
  // Define thresholds for performance metrics
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95th percentile response time should be less than 200ms
    http_req_duration: ["p(99)<200"], // 99th percentile response time should be less than 200ms
    http_req_failed: ["rate<0.01"], // Error rate should be less than 1%
    'http_reqs{expected_response:true}': ['rate>10'], // Expected response rate should be greater than 10 requests/second
  },
};

// Function to handle logging of failed requests
export function handleFailedRequests() {
        console.log(`Failed requests:`, failedRequestsCounter.name);
}

// Define the main test function
export default function () {
  const startTime = new Date().getTime(); // Capture start time

  msg();
  theSphere();
 

  const endTime = new Date().getTime(); // Capture end time
  const testDuration = (endTime - startTime) / 1000; // Calculate test duration in seconds

  responseTimeTrend.add(testDuration, { type: 'test' }); // Add test duration to the response time trend with a 'type' tag
  successfulRequestRate.add(true, { type: 'test' }); // Increment successful request rate with a 'type' tag
  totalRequests.add(1, { type: 'test' }); // Increment total requests counter with a 'type' tag
  activeUsers.add(__VU, { type: 'test' }); // Set active users to the current VU count with a 'type' tag
}

// Function to msg
function msg() {
  const url = 'https://www.msg.com/';
 
  const response = http.get(url);
  check(response, { 'status is 200': (r) => r.status === 200 }, { type: 'msg' }); // Assign a 'type' tag to the check for authentication
  check(response, { 'response time is less than 300ms': (r) => r.timings.duration < 300 }, { type: 'msg' }); // Assign a 'type' tag to the check for authentication
  
  // Increment failed requests counter if the request failed
  if (!check(response, { 'status is 200': (r) => r.status === 200 })) {
    failedRequestsCounter.add(1);
  }

  sleep(1);
}

// Function to theShere
function theSphere() {
  const response = http.get('https://thesphere.com/');
  check(response, { 'status is 200': (r) => r.status === 200 }, { type: 'theSphere' }); // Assign a 'type' tag to the check for retrieving bookings
  check(response, { 'response time is less than 200ms': (r) => r.timings.duration < 200}, { type: 'theSphere' }); // Assign a 'type' tag to the check for retrieving bookings
  
  // Increment failed requests counter if the request failed
  if (!check(response, { 'status is 200': (r) => r.status === 200 })) {
    failedRequestsCounter.add(1);
  }

  sleep(1);
}


export function handleSummary(data) {
  return {
    "reports/performance.html": htmlReport(data),
  };
}
