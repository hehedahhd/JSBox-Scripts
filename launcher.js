const data = [{
  title: {
    text: "New Email"
  },
  bgcolor: {
    bgcolor: $color("#5e96ff")
  },
  icon: {
    icon: $icon("032", $color("white"), $size(20, 20))
  },
  url:"mailto://"
},
{
  title: {
    text: "New Message"
  },
  bgcolor: {
    bgcolor: $color("#5ec0ff")
  },
  icon: {
    icon: $icon("034", $color("white"), $size(20, 20))
  },
  url:"sms://"
},
{
  title: {
    text: "JSBox"
  },
  bgcolor: {
    bgcolor: $color("#157EFB")
  },
  icon: {
    icon: $icon("132", $color("white"), $size(20, 20))
  },
  url:"jsbox://"
},]

$ui.render({
  props: {
    title: "Launcher"
  },
  views: [{
    type: "matrix",
    props: {
      columns: 3,
      itemHeight: 55,
      spacing: 5,
      template: [{
          type: "view",
          props: {
            id: "bgcolor",
            radius: 9,
          },
          layout: $layout.fill
        },
        {
          type: "label",
          props: {
            id: "title",
            textColor: $color("white"),
            bgcolor: $color("clear"),
            //font: $font(18)
          },
          layout(make, view) {
            make.bottom.inset(0)
            make.centerX.equalTo(view.super)
            make.height.equalTo(27)
          }
        },
        {
          type: "image",
          props: {
            id: "icon",
            bgcolor: $color("clear")
          },
          layout(make, view) {
            make.top.inset(3)
            make.centerX.equalTo(view.super)
            make.size.equalTo(27)
          }
        }
      ],
      data: data
    },
    layout: $layout.fill,
    events:{
      didSelect(sender,indexPath,data){
        $app.openURL(data.url)
      }
    }
  }]
})