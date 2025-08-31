export const createPaginationResponseSchema = (itemSchema: any) => {
  return {
    type: 'object',
    properties: {
      page: {
        type: 'number',
        description: 'The page number',
        example: 1,
      },
      limit: {
        type: 'number',
        description: 'The number of items per page',
        example: 10,
      },
      items: {
        type: 'array',
        description: 'The items in the current page',
        items: itemSchema,
      },
    },
  };
};
