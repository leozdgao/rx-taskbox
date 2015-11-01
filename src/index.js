/// <reference path="../typings/tsd.d.ts" />
var Rx = require('rx')
var $ = require('jquery')

var GITHUB_USERS_API = 'https://api.github.com/users'
var getUserRequestUrl = function () {
  var randomOffset = Math.floor(Math.random() * 500)
  return GITHUB_USERS_API + '?since=' + randomOffset;
}

var refreshClickStream = getEventStream('#btn-refresh', 'click')
// request on start or on refresh button click
var requestStream = refreshClickStream.startWith('startup')
  .map(getUserRequestUrl)

var responseStream = requestStream.flatMap(function (reqUrl) {
  return Rx.Observable.fromPromise($.getJSON(reqUrl))
}).publish().refCount()
var closeClickStream = getEventStream('#close0', 'click')
var entryStream = closeClickStream.startWith('start')
  .combineLatest(responseStream, function (close, userList) {
    return userList[Math.floor(Math.random() * userList.length)]
  })
  .merge(refreshClickStream.map(function () { return null }))
  .startWith(null)

responseStream.subscribe(function (res) {
  
})
entryStream.subscribe(function (entry) {
  if (entry == null) {  }
  else { }
})

function getEventStream (selector, event) {
  var elem = document.querySelector(selector)
  return elem && Rx.Observable.fromEvent(elem, event)
}