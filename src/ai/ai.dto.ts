export class CreateAiMessageDto {
  ingredients: string[]
  prUseAllIngredients: boolean
  additionalIngredientsCount?: number
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