export default {
  "orgs": {
    "acme": {
      "edges": {
        "production<->product1": {
          "a": "production-id",
          "b": "product-id1",
          "q": 10
        },
        "product1<->recipe1": {
          "a": "product-id1",
          "b": "recipe-id1",
          "q": 4
        },
        "product1<->recipe2": {
          "a": "product-id1",
          "b": "recipe-id2",
          "q": 8
        },
        "production<->product2": {
          "a": "production-id",
          "b": "product-id2",
          "q": 15
        },
        "production<->recipe1": {
          "a": "production-id",
          "b": "recipe-id1",
          "q": 5,
          "sign": -1
        },
        "product2<->recipe1": {
          "a": "product-id2",
          "b": "recipe-id1",
          "q": 20
        },
        "recipe1->ingredient": {
          "a": "recipe-id1",
          "b": "ingredient-id1",
          "q": 12
        },
        "recipe2->ingredient": {
          "a": "recipe-id2",
          "b": "ingredient-id1",
          "q": 7
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
          "isActive": true,
          "shelfLife": 3,
          "parents": {
            "production<->product1": true
          },
          "children": {
            "product1<->recipe1": true
          }
        },
        "product-id2": {
          "label": "Aswesome Lemon Juice",
          "type": "product",
          "parents": {
            "production<->product2": true
          },
          "children": {
            "product2<->recipe1": true
          }
        },
        "recipe-id1": {
          "label": "Salty Sauce",
          "type": "recipe",
          "parents": {
            "product1<->recipe1": true
          },
          "children": {
            "recipe1->ingredient": true
          }
        },
        "recipe-id2": {
          "label": "Tomato Sauce",
          "type": "recipe",
          "isActive": true,
          "shelfLife": 2,
          "parents": {
            "product1<->recipe2": true
          },
          "children": {
            "recipe2->ingredient": true
          }
        },
        "ingredient-id1": {
          "label": "Salt",
          "type": "ingredient",
          "isActive": true,
          "shelfLife": 5,
          "parents": {
            "recipe1->ingredient": true,
            "recipe2->ingredient": true
          }
        },
        "ingredient-id2": {
          "label": "Tomato",
          "type": "ingredient"
        }
      }
    }
  }
}
