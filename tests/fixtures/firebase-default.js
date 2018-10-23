export default {
  "orgs" : {
    "acme" : {
      "edges": {
        "production<->product": {
          "a": "production-id",
          "b": "product-id",
          "q": 10
        },
        "product<->recipe": {
          "a": "product-id",
          "b": "recipe-id",
          "q": 10
        },
        "recipe->ingredient": {
          "a": "recipe-id",
          "b": "ingredient-id",
          "q": 10
        }
      },
      "nodes": {
        "production-id": {
          "label": "Crazy Production",
          "type": "production",
          "children": {
            "production<->product": true
          }
        },
        "product-id": {
          "label": "Tasty Salad",
          "type": "product",
          "parents": {
            "production<->product": true
          },
          "children": {
            "product<->recipe": true
          }
        },
        "recipe-id": {
          "label": "Salty Sauce",
          "type": "recipe",
          "parents": {
            "product<->recipe": true
          },
          "children": {
            "recipe<->ingredient": true
          }
        },
        "ingredient-id": {
          "label": "Salt",
          "type": "ingredient",
          "parents": {
            "recipe<->ingredient": true
          }
        }
      }
    }
  }
}
