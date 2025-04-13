export class CreateAiMessageDto {
  ingredients: string[]
  cuisine?: string
  comment?: string
}

export class ResponseCreateAiMessageDto {
  name: string
  ingredients: IngredientDto[]
  portions: string
  steps: string[]
}

export class IngredientDto {
  name: string
  amount: string
}