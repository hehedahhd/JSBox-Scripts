/*

  F-Start,一个强大的效率工具
  “F”即“fast”,意为“快速地”;
  “Start”意为“启动”;
  “F-Start”即“极速启动”
  有了这个脚本,你可以在JSBox上享受Pin的效率,在Pin上体验更高效率!
  
  by:Hhdº
  email:hehedahhd@icloud.com

*/

$app.keyboardToolbarEnabled = true

function mainView() {
  const ico = {
    "ico1": $cache.get("icon1"),
    "ico2": $cache.get("icon2"),
    "ico3": $cache.get("icon3"),
    "ico4": $cache.get("icon4")
  }
  Tips = "%CLIPBOARD% 将被剪切板的内容填充\n%LINK% 将把剪切板URL转码并填充\n%BASE64% 将把剪切板BASE64转码并填充"
  ModeView = [{
    type: "view",
    layout: $layout.fill,
    views: [{
        type: "input",
        props: {
          id: "code",
          bgcolor: $color("white"),
          placeholder: "输入模式"
        },
        layout: function(make) {
          make.top.left.bottom.inset(5)
          make.right.inset(70)
        }
      },
      {
        type: "button",
        props: {
          title: "选择"
        },
        layout: function(make, view) {
          make.right.inset(5)
          make.left.equalTo($("code").right).offset(5)
          make.centerY.equalTo(view.super)
        },
        events: {
          tapped(sender) {
            Choose()
          }
        }
      }
    ]
  }]
  BuiltIn = [{
      title: "搜索引擎",
      events: [{
          name: "百度搜索",
          type: "网页",
          mode: "http://www.baidu.com/s?wd=%LINK%"
        },
        {
          name: "必应搜索",
          type: "网页",
          mode: "https://cn.bing.com/search?q=%LINK%"
        },
        {
          name: "谷歌搜索",
          type: "网页",
          mode: "https://www.google.com.hk/search?q=%LINK%"
        },
        {
          name: "搜狗搜索",
          type: "网页",
          mode: "http://www.sogou.com/web?query=%LINK%"
        },
        {
          name: "快速打开链接",
          type: "网页",
          mode: "%LINK%"
        }
      ]
    },
    {
      title: "便民查询",
      events: [{
          name: "号码归属地查询",
          type: "网页",
          mode: "http://www.ip138.com:8080/search.asp?action=mobile&mobile=%LINK%"
        },
        {
          name: "快递查询",
          type: "网页",
          mode: "http://m.kuaidi100.com/index_all.html?postid=%LINK%"
        },
        {
          name: "IP查询",
          type: "网页",
          mode: "http://www.wangsu123.cn/ip/"
        },
        {
          name: "网络测速",
          type: "网页",
          mode: "http://www.wangsu123.cn/"
        },
        {
          name: "必应词典",
          type: "网页",
          mode: "http://cn.bing.com/dict/%LINK%"
        }
      ]
    },
    {
      title: "应用速启",
      events: [{
          name: "迅雷下载",
          type: "应用",
          mode: "thunder://%BASE64%"
        },
        {
          name: "微信扫一扫",
          type: "应用",
          mode: "weixin://scanqrcode"
        },
        {
          name: "Thor-开始抓包",
          type: "应用",
          mode: "thor://sniffer.gui/launch"
        },
        {
          name: "Thor-结束抓包",
          type: "应用",
          mode: "thor://sniffer.gui/shutdown"
        },
        {
          name: "Thor-抓包记录",
          type: "应用",
          mode: "thor://session.gui/all"
        },
        {
          name: "Thor-当前抓包",
          type: "应用",
          mode: "thor://session.gui/active"
        },
        {
          name: "App Store-搜索",
          type: "应用",
          mode: "https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?mt=8&submit=edit&term=%LINK%#software"
        },
        {
          name: "支付宝-扫一扫",
          type: "应用",
          mode: "alipay://platformapi/startapp?appId=10000007"
        },
        {
          name: "支付宝-付款",
          type: "应用",
          mode: "alipay://platformapi/startapp?appId=20000056"
        },
        {
          name: "支付宝-蚂蚁森林",
          type: "应用",
          mode: "alipay://platformapi/startapp?appId=60000002"
        }
      ]
    },
    {
      title: "系统设置",
      events: [{
          name: "电池",
          type: "应用",
          mode: "Prefs:root=BATTERY_USAGE"
        },
        {
          name: "通用",
          type: "应用",
          mode: "Prefs:root=General"
        },
        {
          name: "打电话",
          type: "应用",
          mode: "tel://%CLIPBOARD%"
        },
        {
          name: "发短信",
          type: "应用",
          mode: "sms://%CLIPBOARD%"
        },
        {
          name: "发邮件",
          type: "应用",
          mode: "mailto://%CLIPBOARD%"
        },
        {
          name: "FaceTime",
          type: "应用",
          mode: "facetime://%CLIPBOARD%"
        }
      ]
    }
  ]
  $ui.render({
    props: {
      title: "F-Start"
    },
    views: [{
      type: "matrix",
      props: {
        id: "FileList",
        columns: 4,
        spacing: 0,
        square: true,
        template: [{
            type: "image",
            props: {
              id: "img",
              bgcolor: $color("white")
            },
            layout: function(make, view) {
              var S = ($device.info.model.indexOf("iPad") == -1) ? 50 : 100
              make.centerX.equalTo(view.super)
              make.bottom.inset(($device.info.model.indexOf("iPad") == -1) ? 30 : 50)
              make.size.equalTo($size(S, S))
            }
          },
          {
            type: "label",
            props: {
              id: "name",
              textColor: $color("#474b51"),
              align: $align.center,
              font: $font(($device.info.model.indexOf("iPad") == -1) ? 15 : 20)
            },
            layout: function(make) {
              make.bottom.left.right.inset(10)
            }
          }
        ]
      },
      layout: $layout.fill,
      events: {
        didSelect(sender, indexPath, data) {
          if (indexPath.row == sender.data.length - 1) {
            add()
          } else {
            $ui.menu({
              items: ["打开", "编辑"],
              handler: function(title, idx) {
                if (idx == 0) {
                  var cb = $clipboard.text
                  url = data.mode.replace(/%CLIPBOARD%/g, cb).replace(/%LINK%/g, encodeURI(cb)).replace(/%BASE64%/g, $text.base64Encode(cb))
                  if (data.openInScript == true) {
                    openURL(url)
                  } else {
                    $app.openBrowser({ url: url })
                  }
                } else edit(data)
              }
            })
          }
        }
      }
    }]
  })

  function refresh() {
    var arr = []
    var exists = $drive.exists("FStart.txt")
    if (exists == 1) {
      var files = JSON.parse($drive.read("FStart.txt").string)
      for (i in files) {
        var item = files[i]
        icon = null
        switch (item.type) {
          case "文件夹":
            icon = ico.ico1
            break
          case "网页":
            icon = ico.ico2
            break
          case "应用":
            icon = ico.ico3
            break
        }
        arr.push({
          name: {
            text: item.name
          },
          img: {
            src: icon
          },
          mode: item.mode,
          index: i,
          type: item.type,
          openInScript: item.openInScript
        })
      }
    }
    arr.push({
      name: {
        text: "添加"
      },
      img: {
        src: ico.ico4
      }
    })
    $("FileList").data = arr
  }

  refresh()

  function edit(EvevtInfo) {
    $ui.push({
      props: {
        title: "编辑项目"
      },
      views: [{
        type: "list",
        props: {
          id: "EditList",
          data: [{
              title: "标题",
              rows: [{
                type: "input",
                props: {
                  id: "Title",
                  bgcolor: $color("white"),
                  placeholder: "输入标题",
                  text: EvevtInfo.name.text
                },
                layout: function(make) {
                  make.top.left.right.bottom.inset(5)
                }
              }]
            },
            {
              title: Tips,
              rows: [{
                type: "input",
                props: {
                  id: "Code",
                  bgcolor: $color("white"),
                  placeholder: "输入模式",
                  text: EvevtInfo.mode
                },
                layout: function(make) {
                  make.top.left.bottom.right.inset(5)
                }
              }]
            },
            {
              rows: [{
                type: "view",
                layout: $layout.fill,
                views: [{
                    type: "label",
                    props: {
                      font: $font(16),
                      text: "在脚本内打开"
                    },
                    layout: function(make, view) {
                      make.left.inset(10)
                      make.centerY.equalTo(view.super)
                    }
                  },
                  {
                    type: "switch",
                    props: {
                      id: "Switch",
                      on: (EvevtInfo.openInScript == true) ? true : false
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super)
                      make.right.inset(10)
                    },
                    events: {
                      changed: function(sender) {

                      }
                    }
                  }
                ]
              }]
            },
            {
              rows: [{
                type: "button",
                props: {
                  title: "完成",
                  radius: 0
                },
                layout: $layout.fill,
                events: {
                  tapped(sender) {
                    var file = JSON.parse($drive.read("FStart.txt").string)
                    file.splice(EvevtInfo.index, 1, {
                      name: $("Title").text,
                      type: EvevtInfo.type,
                      mode: $("Code").text,
                      files: [],
                      openInScript: $("Switch").on
                    })
                    file = JSON.stringify(file)
                    $drive.write({
                      data: $data({ string: file }),
                      path: "FStart.txt"
                    })
                    refresh()
                    $ui.pop()
                  }
                }
              }]
            },
            {
              rows: [{
                type: "button",
                props: {
                  title: "删除",
                  bgcolor: $color("#E24939"),
                  radius: 0
                },
                layout: $layout.fill,
                events: {
                  tapped(sender) {
                    $ui.menu({
                      items: ["删除"],
                      handler() {
                        var file = JSON.parse($drive.read("FStart.txt").string)
                        file.splice(EvevtInfo.index, 1)
                        file = JSON.stringify(file)
                        $drive.write({
                          data: $data({ string: file }),
                          path: "FStart.txt"
                        })
                        refresh()
                        $ui.pop()
                      }
                    })
                  }
                }
              }]
            }
          ]
        },
        layout: $layout.fill
      }]
    })
    if (EvevtInfo.type !== "网页") {
      $("EditList").delete($indexPath(2, 0))
    }
  }

  function add() {
    $ui.push({
      props: {
        title: "添加项目"
      },
      views: [{
        type: "list",
        props: {
          id: "AddEventList",
          data: [{
              title: "标题",
              rows: [{
                type: "input",
                props: {
                  id: "title",
                  bgcolor: $color("white"),
                  placeholder: "输入标题"
                },
                layout: function(make) {
                  make.top.left.right.bottom.inset(5)
                }
              }]
            },
            {
              title: "类型",
              rows: [{
                label: {
                  text: "网页"
                }
              }]
            },
            {
              title: Tips,
              rows: ModeView
            },
            {
              rows: [{
                type: "button",
                props: {
                  title: "添加",
                  radius: 0
                },
                layout: $layout.fill,
                events: {
                  tapped(sender) {
                    if ($("AddEventList").data[1].rows[0].label.text == "文件夹") {
                      $ui.alert("文件夹功能暂未开发，请等待版本更新。")
                    } else {
                      var exists = $drive.exists("FStart.txt")
                      file = null
                      if (exists == 0) {
                        file = new Array()
                      } else {
                        file = JSON.parse($drive.read("FStart.txt").string)
                      }
                      file.push({
                        name: $("title").text,
                        type: $("AddEventList").data[1].rows[0].label.text,
                        mode: $("code").text,
                        files: [],
                        openInScript: false
                      })
                      file = JSON.stringify(file)
                      $drive.write({
                        data: $data({ string: file }),
                        path: "FStart.txt"
                      })
                      refresh()
                      $ui.pop()
                    }
                  }
                }
              }]
            }
          ],
          template: [{
            type: "label",
            props: {
              id: "label",
              font: $font(17)
            },
            layout: function(make, view) {
              make.centerY.equalTo(view.super)
              make.left.inset(15)
            }
          }]
        },
        layout: $layout.fill,
        events: {
          didSelect(sender, indexPath, data) {
            if (indexPath.section == 1) {
              $ui.menu({
                items: ["文件夹", "网页", "应用"],
                handler: function(title, idx) {
                  var list = sender.data
                  list[1].rows[0].label.text = title
                  if (sender.data[1].rows[0].label.text !== "文件夹" && idx == 0) {
                    list.splice(2, 1, {})
                  } else if (sender.data[1].rows[0].label.text == "文件夹" && idx !== 0) {
                    list.splice(2, 1, {
                      title: Tips,
                      rows: ModeView
                    })
                  }
                  sender.data = list
                }
              })
            }
          }
        }
      }]
    })
  }

  function Choose() {
    $ui.push({
      props: {
        title: "内置项目"
      },
      views: [{
          type: "menu",
          props: {
            items: BuiltIn.map(function(item) {
              return item.title
            }),
          },
          layout: function(make) {
            make.left.top.right.equalTo(0)
            make.height.equalTo(44)

          },
          events: {
            changed: function(sender) {
              $("BuiltInList").scrollTo({
                indexPath: $indexPath(i, 0),
                animated: true
              })

            }
          }
        },
        {
          type: "list",
          props: {
            id: "BuiltInList"
          },
          layout: function(make) {
            make.top.equalTo($("menu").bottom)
            make.right.left.bottom.inset(0)
          },
          events: {
            didSelect(sender, indexPath, data) {
              $ui.pop()
              var info = BuiltIn[indexPath.section].events[indexPath.row]
              list = $("AddEventList").data
              list[1].rows[0].label.text = info.type
              $("AddEventList").data = list
              $("title").text = info.name
              $("code").text = info.mode
            }
          }
        }
      ]
    })

    var arr = new Array()
    for (i in BuiltIn) {
      arr.push({
        title: BuiltIn[i].title,
        rows: BuiltIn[i].events.map(function(item) {
          return item.name
        })
      })
    }
    $("BuiltInList").data = arr
  }
}

const clues = "首次打开加载中…"
version = "1.3"

if (!$cache.get("icon2")) {
  $ui.progress(0, clues)
  $http.get({
    url: "https://coding.net/u/Hhhd/p/Hhhd1507206502721.Coding.me/git/raw/master/%25E6%2596%2587%25E4%25BB%25B6%25E5%25A4%25B9icon",
    handler(resp) {
      $cache.set("icon1", resp.data)
      $ui.progress(0.25, clues)
      $http.get({
        url: "https://coding.net/u/Hhhd/p/Hhhd1507206502721.Coding.me/git/raw/master/%25E7%25BD%2591%25E7%25AB%2599icon",
        handler(resp) {
          $cache.set("icon2", resp.data)
          $ui.progress(0.5, clues)
          $http.get({
            url: "https://coding.net/u/Hhhd/p/Hhhd1507206502721.Coding.me/git/raw/master/%25E5%25BA%2594%25E7%2594%25A8icon",
            handler(resp) {
              $cache.set("icon3", resp.data)
              $ui.progress(0.75, clues)
              $http.get({
                url: "https://coding.net/u/Hhhd/p/Hhhd1507206502721.Coding.me/git/raw/master/addicon",
                handler(resp) {
                  $cache.set("icon4", resp.data)
                  $ui.progress(1, clues)
                  Start()
                }
              })
            }
          })
        }
      })
    }
  })
} else Start()

function Start() {
  $http.get({
    url: "https://coding.net/u/Hhhd/p/Hhhd1507206502721.Coding.me/git/raw/master/FStart",
    handler(resp) {
      if (resp.data.ver !== version) {
        $ui.alert({
          title: "发现新版本-" + resp.data.ver,
          message: resp.data.msg,
          actions: [{
              title: "取消"
            },
            {
              title: "更新",
              handler: function() {
                $app.openBrowser({
                  url: resp.data.url
                })
              }
            }
          ]
        })
      }
    }
  })
  if ($app.env == $env.today) {
    var file = JSON.parse($drive.read("FStart.txt").string)
    $ui.menu({
      items: file.map(function(item) {
        return item.name
      }),
      handler(title, idx) {
        var cb = $clipboard.text
        url = file[idx].mode.replace(/%CLIPBOARD%/g, cb).replace(/%LINK%/g, encodeURI(cb)).replace(/%BASE64%/g, $text.base64Encode(cb))
        if (file[idx].openInScript == true) {
          $ui.render({
            props: {
              title: url
            },
            views: [{
              type: "web",
              props: {
                url: url
              },
              layout: $layout.fill
            }]
          })
        } else $app.openBrowser({ url: url })
      }
    })
  } else mainView()
}

function openURL(url) {
  $ui.push({
    props: {
      title: url
    },
    views: [{
      type: "web",
      props: {
        url: url
      },
      layout: $layout.fill
    }]
  })
}