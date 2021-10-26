import { UnSignedObject, ErrorReasons } from "@handy/types";

// Errors types and interfaces
export type ErrorPriority = 'low' | 'medium' | 'high';

export interface HandyError {
  parsed: boolean,
  priority: ErrorPriority,
  time: number,
  source: string,
  errorCode: number,
  errorMsg: string,
  errorHeadline: ErrorReasons,
  refCode: string,
  additionalData?: {
    public?: any,
    private?: any
  },
  originalError?: any,
  request?: UnSignedObject,
  hasRequest: boolean,
  isHandyError: boolean
}