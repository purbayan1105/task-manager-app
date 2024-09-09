import { NextResponse } from "next/server";

export const errorMsg = (
  message: any,
  statusCode: any,
  successStatsus: any
) => {
  return NextResponse.json({
    message: message,
    statusCode: statusCode,
    successStatsus: successStatsus,
  });
};
