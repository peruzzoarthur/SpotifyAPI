// import { server } from "./mocks/node";
// import { beforeAll, afterEach, afterAll } from "vitest";

// // Establish API mocking before all tests.
// beforeAll(() => server.listen());
// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
// afterEach(() => server.resetHandlers());
// // Clean up after the tests are finished.
// afterAll(() => server.close());

// server.events.on("request:start", ({ request }) => {
//   console.log("MSW intercepted:", request.method, request.url);
// });
