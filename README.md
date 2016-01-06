# combo.js

The following script will transform a ***select*** dropdown list into an editable combo box.

###Usage:

jQuery is a dependency; so, I am sorry if you don't use jQuery in your project.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.js"></script>
<link href="../css/combojs.css" rel="stylesheet" />
<script src="../js/combo.js"></script>
```

All you need is to add the **combojs** attribute with a name to the **select** element and the scripts included above will do the transformation.

```html
    <select combojs="colors">
        <option value="1">Red</option>
        <option value="2">Green</option>
        <option value="3">Blue</option>
        <option value="4">Black</option>
        <option value="5">Yellow</option>
    </select>
```

There is a javascript object in case you need to interact with the combo box.
```js
  //Gets the selected value
  $combo("colors").getSelected
  
  //Items in the collection
  $combo("colors").items
  
  //Sets the selected value (it doesn't have to be in the list)
  $combo("colors").setSelected(2, "Green");

  //Add items to combo box
  $combo("colors").add([{ label: "white", value: 6 },
                        { label: "magenta", value: 7 } ]);
  
  //Clear list
  $combo("colors").clear();
  
```



