# Flybits Coffee Shop

> A simple point-of-sale (POS) application for a coffee shop like Starbucks



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# clean the production build
npm run clean
```

## Models
### Drink View
####  Item Model
* Represents an item for sale by the  
* Contains Ingredient Class Array
* Max Ingredients?
* Contains Recipie Class
    * An Optional as either Null or a recipie
* Contains Size 
    * Weight class like XL , L , M, ... and associated size in ml
    * Might add specifically to drink class or atleast overwrite it
* Tempurature
    * So far just enum of hot or cold
* Price 
    * Computed Recipie price / of sum ingredient price
    * Recipie price precedence
* Name 
    * Computed from Recipie or Custom
* Description 
    * From Recipie 
* Type 
    * Type of item either being drink or food
    * Subclassing maybe?
* CheckRecipie()
    * Checks If ingredients are recipie compliant
    * If not, searches for new reciepie
        * If None Found, cite as cutom / recipie "modified"
        * Additional ingredients might lead to Different Recipie
    * Checked after every addition / removal of an ingredient
* AddIngredient()
    * Adds sign ingredient input into item array
    * Takes ingredient string keys and searches Ingedient Store
* RemoveIngredient()
    * Reacts to remove event and removes ingredient 
* AddRecipie()
   * Takes in a recipie
   * Removes other recipie ingredients (base ingredients)
   * Using recipie key strings used Ingredient store and adds to ingredient array
* RemoveRecipie()
   * Removes Ingredients that are base of the recipie
   * private as helper for Add Recipe

#### Recipie Model
* Name
* Description
* Price
* AddOn Limit?
  * This Price takes precendence over ingredient price sum 
  * Extra ingredients add to the overall price
      * Taken Care of in Item Class
* RecipieStyle Object
   * Contains UI stlyes applied when Recipie is selected
* isSelected ?
    * computed boolean if in Item is in Current Item Object
* Required Ingredients
    * List of Ingredient Key Strings
* isRecipie()
    * Takes array of ingredients
    * Returns number of ingredients if match, 0 otherwise
        * Ingredients might match multiple recipies but the recipie that has the most of them will be picked
* UnSuppotedIngredients ?

> If ingredients are not avalible either show disabled or not show at all

#### Ingredient Model
* Name
* Description
* Price
* isSelected
   * If in the current Item
* Type
    * Enum value of what that ingredient contributes to the item
    * Base Type
        * One of the main ingredients of a recipe
    * AddOn Type
        * General ingredients universal to most drinks like cream and suger 
* Ingredient Style
    * Icon / Image
        * Used For Ingredient Listing
    * Pattern / substance depiction image
        * Used for drink depiction on UI

> If an ingredient is not avaliable not returned from api!

## Components
### Drink View
Split into 4 sections

#### Menu Component
* List
* List Item
    * Name
    * Icon
    * Add
    * Expand On Click
         * Show Description
         * Show Options
* List Tabs
    * Recipies
    * Ingredients
    * AddOns
* List Search?
    
#### Drink Image Component

#### Selection Component
* List
* List Items
    * Name
    * Icon
    * Remove
    * Percentage Of Drink?
    * Expand On Click
         * Show Description
         * Show Options
* Size Chooser
* Save Cutome Recipe?
    
####Shopping Cart (optional for multiple drinks)
   


## References

[Vue Cli Starter Code](https://www.google.com)
