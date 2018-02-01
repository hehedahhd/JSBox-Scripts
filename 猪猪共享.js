/*

使用了猪猪共享的「公开透明」的api

猪猪共享APP下载地址：https://fir.im/zhuzhugongxiang

By Hhdº

*/

const iconType = ["062", "067", "023"]
mainColor = $color("#FF9400")
url = "http://47.93.97.249/newzhuzhu/"

$ui.render({
  props: {
    title: "猪猪共享"
  },
  views: [{
      type: "view",
      props: {
        id: "Menu"
      },
      views: [{
          type: "view",
          props: {
            id: "line",
            bgcolor: $color("#b2b2b2")
          },
          layout(make) {
            make.top.right.left.inset(0)
            make.height.equalTo(0.5)
          }
        },
        {
          type: "button",
          props: {
            id: "B1",
            bgcolor: $color("white")
          },
          layout(make, view) {
            make.bottom.inset(0)
            make.top.equalTo($("line").bottom)
            make.width.equalTo(view.super).dividedBy(3)
          },
          events: {
            tapped(sender) {
              ChangeColor(sender, 0)
              $cache.clear()
            }
          }
        },
        {
          type: "button",
          props: {
            id: "B2",
            bgcolor: $color("white")
          },
          layout(make, view) {
            make.bottom.inset(0)
            make.left.equalTo($("B1").right)
            make.top.equalTo($("line").bottom)
            make.width.equalTo(view.super).dividedBy(3)
          },
          events: {
            tapped(sender) {
              ChangeColor(sender, 1)
            }
          }
        },
        {
          type: "button",
          props: {
            id: "B3",
            bgcolor: $color("white")
          },
          layout(make, view) {
            make.bottom.inset(0)
            make.left.equalTo($("B2").right)
            make.top.equalTo($("line").bottom)
            make.width.equalTo(view.super).dividedBy(3)
          },
          events: {
            tapped(sender) {
              ChangeColor(sender, 2)
              $("histroy_list").data = $cache.get("his")
            }
          }
        }
      ],
      layout(make) {
        make.left.right.bottom.inset(0)
        make.height.equalTo(44)
      }
    },
    {
      type: "view",
      layout(make) {
        make.top.left.right.inset(0)
        make.bottom.equalTo($("Menu").top)
      },
      views: [{
          type: "list",
          props: {
            id: "0_list",
            rowHeight: 450,
            template: [{
                type: "image",
                props: {
                  id: "img",
                  bgcolor: $color("white")
                },
                layout(make) {
                  make.top.left.right.inset(15)
                  make.bottom.inset(95)
                }
              },
              {
                type: "image",
                props: {
                  id: "img1",
                  radius: 15,
                  bgcolor: $color("white")
                },
                layout(make) {
                  make.left.inset(15)
                  make.bottom.inset(10)
                  make.top.equalTo($("img").bottom).offset(15)
                  make.width.equalTo(70)
                }
              },
              {
                type: "label",
                props: {
                  id: "name",
                  font: $font(25)
                },
                layout(make) {
                  make.top.equalTo($("img").bottom).offset(15)
                  make.left.equalTo($("img1").right).offset(20)
                }
              },
              {
                type: "label",
                props: {
                  id: "note",
                  font: $font(18)
                },
                layout(make) {
                  make.top.equalTo($("name").bottom).offset(15)
                  make.left.equalTo($("name"))
                }
              }
            ]
          },
          layout: $layout.fill,
          events: {
            pulled(sender) {
              var cache = $cache.get("url")
              normalurl = "index.php?c=app&a=new_download"
              if (!$cache.get("url")) {
                refresh(normalurl)
              } else refresh(cache)
            },
            didSelect(sender, indexPath, data) {
              details(data)
            }
          }
        },
        {
          type: "list",
          props: {
            id: "1_list",
            hidden: true,
            rowHeight: 64,
            template: [{
                type: "image",
                props: {
                  id: "image"
                },
                layout: function(make, view) {
                  make.left.top.bottom.inset(10)
                  make.width.equalTo(view.height)
                }
              },
              {
                type: "label",
                props: {
                  id: "label",
                  font: $font("bold", 17),
                  lines: 0
                },
                layout: function(make) {
                  make.left.equalTo($("image").right).offset(10)
                  make.top.bottom.equalTo(0)
                  make.right.inset(10)
                }
              }
            ]
          },
          layout: $layout.fill,
          events: {
            didSelect: function(sender, indexPath, data) {
              $ui.loading(true)
              refresh("index.php?c=app&a=category_down&category_id=" + data.id)
              refreshList(1)
            }
          }
        },
        {
          type: "view",
          props: {
            id: "2_list"
          },
          layout: $layout.fill,
          views: [{
              type: "list",
              props: {
                id: "input_list",
                data: [{
                  rows: [{
                      type: "input",
                      props: {
                        type: $kbType.search,
                        placeholder: "搜索应用...",
                        clearsOnBeginEditing:true
                      },
                      layout: function(make, view) {
                        make.left.right.top.bottom.inset(5)
                      },
                      events: {
                        returned: function(sender) {
                          var his = $cache.get("his")
                          if (his) {
                            his.unshift(sender.text)
                          } else his = [sender.text]
                          $cache.set("his", his)
                          sender.blur()
                          search(sender.text)
                        }
                      }
                    },
                    {
                      type: "label",
                      props: {
                        text: "by Hhdº"
                      },
                      layout: function(make, view) {
                        make.left.inset(10)
                        make.centerY.equalTo(view.super)
                      }
                    }
                  ]
                }]
              },
              layout: function(make) {
                make.height.equalTo(50)
                make.left.right.top.inset(0)
              }
            },
            {
              type: "list",
              props: {
                id: "histroy_list",
                actions: [{
                  title: "delete",
                  handler(sender) {
                    $cache.set("his", sender.data)
                  }
                }],
                reorder: true
              },
              layout(make) {
                make.top.equalTo($("input_list").bottom)
                make.bottom.left.right.inset(0)
              },
              events: {
                didSelect(sender, indexPath, data) {
                  search(data)
                },
                reorderFinished: function(data) {
                  $cache.set("his", data)
                }
              }
            }
          ]
        }
      ]
    }
  ]
})

function details(info) {
  $ui.push({
    props: {
      title: "应用详情"
    },
    views: [{
        type: "image",
        props: {
          id: "app_img",
          radius: 10,
          src: info.img.src
        },
        layout(make) {
          make.top.left.right.inset(10)
          make.height.equalTo(300)
        }
      },
      {
        type: "label",
        props: {
          id: "title",
          text: info.name.text,
          font: $font(25)
        },
        layout(make, view) {
          make.top.equalTo($("app_img").bottom).offset(10)
          make.centerX.equalTo(view.super)
        }
      },
      {
        type: "web",
        props: {
          id: "Web",
          html: info.brief
        },
        layout(make, view) {
          make.top.equalTo($("title").bottom).offset(10)
          make.left.right.inset(10)
          make.bottom.inset(50)
        }
      },
      {
        type: "view",
        views: [{
            type: "button",
            props: {
              id: "account",
              type: 1,
              title: "账号:" + info.username
            },
            layout(make, view) {
              make.bottom.left.inset(0)
              make.height.equalTo(view.super)
              make.width.equalTo(view.super).dividedBy(2)
            },
            events: {
              tapped(sender) {
                $clipboard.text = info.username
              }
            }
          },
          {
            type: "button",
            props: {
              type: 1,
              title: "密码:" + info.password
            },
            layout(make, view) {
              make.bottom.inset(0)
              make.left.equalTo($("account").right)
              make.height.equalTo(view.super)
              make.width.equalTo(view.super).dividedBy(2)
            }
          }
        ],
        layout(make) {
          make.top.equalTo($("Web").bottom).offset(10)
          make.left.right.bottom.inset(10)
        },
        events: {
          tapped(sender) {
            $clipboard.text = info.password
          }
        }
      },
      {
        type: "button",
        props: {
          title: "我要玩"
        },
        layout(make) {
          make.top.equalTo($("Web").bottom).offset(10)
          make.left.right.bottom.inset(10)
        },
        events: {
          tapped(sender) {
            sender.hidden = true
          }
        }
      }
    ]
  })
}

function ChangeColor(sd, num) {
  $("B1").icon = $icon(iconType[0], $color("#a4b4c4"), $size(30, 30))
  $("B2").icon = $icon(iconType[1], $color("#a4b4c4"), $size(30, 30))
  $("B3").icon = $icon(iconType[2], $color("#a4b4c4"), $size(30, 30))
  sd.icon = $icon(iconType[num], mainColor, $size(30, 30))
  $("0_list").hidden = true
  $("1_list").hidden = true
  $("2_list").hidden = true
  $(num + "_list").hidden = false
  $("0_list").data = [{
    img: {
      src: ""
    },
    img1: {
      src: ""
    },
    name: {
      text: "下拉刷新"
    },
    note: {
      text: ""
    }
  }]
}

function refreshList(num) {
  $(num + "_list").hidden = true
  $("0_list").hidden = false
  $("0_list").data = [{
    name: {
      text: "加载中..."
    }
  }]
}

function refresh(URL) {
  $cache.set("url", URL)
  $http.get({
    url: url + URL,
    handler: function(resp) {
      $ui.loading(false)
      $("0_list").endRefreshing()
      var data = resp.data.data
      arr = new Array()
      for (i in data) {
        var item = data[i]
        arr.push({
          img: {
            src: url + item.introduce_img
          },
          img1: {
            src: url + item.img
          },
          name: {
            text: item.name
          },
          note: {
            text: item.label
          },
          id: item.id,
          brief: item.brief,
          username: item.username,
          password: item.password
        })
      }
      $("0_list").data = arr
    }
  })
}

function search(text) {
  $ui.loading(true)
  refresh("index.php?c=app&a=new_download&name=" + encodeURI(text))
  refreshList(2)
}

$http.get({
  url: url + "index.php?c=app&a=category",
  handler(resp) {
    var data = resp.data.data
    arr = new Array()
    for (i in data) {
      var item = data[i]
      arr.push({
        image: {
          src: url + item.img
        },
        label: {
          text: item.name
        },
        id: item.a_id
      })
    }
    $("1_list").data = arr
  }
})

ChangeColor($("B1"), 0)

$cache.remove("url")