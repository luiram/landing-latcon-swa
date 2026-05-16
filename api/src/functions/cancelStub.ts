import { app, type HttpRequest, type HttpResponseInit, type InvocationContext } from "@azure/functions";
import { corsHeaders, jsonResponse } from "../lib/cors";

app.http("cancelAppointmentStub", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "appointments/{id}/cancel",
  handler: async (request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    const origin = request.headers.get("origin") ?? undefined;
    if (request.method === "OPTIONS") {
      return { status: 204, headers: corsHeaders(origin) };
    }
    return jsonResponse(501, { code: "NOT_IMPLEMENTED", message: "Cancel/reschedule will be added in a later phase" }, origin);
  },
});
