package com.hotel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hd123.lab.ext.type.ExtResponse;
import com.hotel.entity.LinkWay;
import com.hotel.service.LinkWayService;

@Controller
@RequestMapping(value = "linkway", produces = "application/json;charset=utf-8")
public class LinkWayController {
  @Autowired
  private LinkWayService linkWayService;

  @RequestMapping(value = "/get")
  public @ResponseBody
  ExtResponse getCategory() {
    ExtResponse rsp = new ExtResponse();
    List<LinkWay> linkWays = linkWayService.getAllCategories();
    rsp.setData(linkWays);
    return rsp;
  }
}
