export interface PuTakeout extends Order {
    preparationTime: Date
    
}

// enum Duration {
// "oneHour" = 1,
// "twoHour" = 2,
// "threeHour" = 3,
// "fourHour" = 4
// }

export interface Takeout extends EmTakeout, PuTakeout, Base {

}




