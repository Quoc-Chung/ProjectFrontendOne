export interface ApiResponse<T> {
    status: {
      code: string;
      message: string;
      description: string;
    };
    data: T;
    extraData: any;
  }


  