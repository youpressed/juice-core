export default {
  "orgs": {
    "acme": {
      "edges": {
        "production<->product1": {
          "a": "production-id",
          "b": "product-id1",
          "q": 10
        },
        "product1<->recipe": {
          "a": "product-id1",
          "b": "recipe-id",
          "q": 10
        },
        "production<->product2": {
          "a": "production-id",
          "b": "product-id2",
          "q": 15
        },
        "product2<->recipe": {
          "a": "product-id2",
          "b": "recipe-id",
          "q": 20
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
          "date": "2018-04-07T08:25:00.565Z",
          "children": {
            "production<->product1": true,
            "production<->product2": true
          }
        },
        "product-id1": {
          "label": "Tasty Salad",
          "type": "product",
          "parents": {
            "production<->product1": true
          },
          "children": {
            "product1<->recipe": true
          }
        },
        "product-id2": {
          "label": "Aswesome Lemon Juice",
          "type": "product",
          "parents": {
            "production<->product2": true
          },
          "children": {
            "product2<->recipe": true
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
