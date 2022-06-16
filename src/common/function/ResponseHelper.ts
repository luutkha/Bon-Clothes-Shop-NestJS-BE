import {
  CustomResponse,
  PaginationResponse,
} from 'src/base-entity/entities/custom-response';
import { ResponseEnum } from '../enum&constants/ResponseEnum';
export class ResponseHelper {
  successResponse(data: any) {
    const response: CustomResponse<typeof data> = {
      message: ResponseEnum.RESPONSE_SUCCESS.toString(),
      data,
      success: true,
    };

    return response;
  }
  failResponse(data: any, errorCode: string) {
    const response: CustomResponse<typeof data> = {
      message: ResponseEnum.RESPONSE_FAIL.toString(),
      data,
      success: false,
      errorCode: errorCode,
    };

    return response;
  }
  successPaginationResponse(data: any) {
    const response: PaginationResponse<typeof data> = {
      message: ResponseEnum.RESPONSE_SUCCESS.toString(),
      data,
      success: true,
    };

    return response;
  }
}
