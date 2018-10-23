export default {
  "orgs" : {
    "acme" : {
      "edges": {
        "production<->product": {
          "a": "production-id",
          "b": "product-id",
          "q": 10
        },
        "production2<->product": {
          "a": "production-id-2",
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
          "ts": 1523136300570,
          "date": "2018-04-07T21:25:00.565Z",
          "children": {
            "production<->product": true
          }
        },
        "production-id-2": {
          "label": "Crazy Production 2",
          "type": "production",
          "children": {
            "production2<->product": true
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
