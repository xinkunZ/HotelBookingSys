package com.hotel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hd123.lab.ext.type.ExtResponse;
import com.hotel.entity.LinkWay;
import com.hotel.service.CategoryService;
import com.hotel.service.LinkWayService;
import com.hotel.service.RoomService;

@Controller
@RequestMapping(value = "init", produces = "application/json;charset=utf-8")
public class InitController {

  @Autowired
  private RoomService roomService;
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private LinkWayService linkWayService;

  @RequestMapping(value = "/start")
  public @ResponseBody
  ExtResponse createTableData(@RequestParam(value = "init")
  String init) {
    //
    // Category category1 = new Category();
    // category1.setCode("first");
    // category1.setDescription("房间面积：20平米。配有单人床一个、市话、长途服务、独立卫生间、淋浴、24小时热水、电视、空调。");
    // category1.setName("普通单人间");
    // category1.setRoomprice(80);
    //
    // Category category2 = new Category();
    // category2.setCode("second");
    // category2.setDescription("房间面积：30平米。配有双人人床一个、市话、长途服务、独立卫生间、淋浴、24小时热水、电视、空调。");
    // category2.setName("舒适双人间");
    // category2.setRoomprice(160);
    //
    // Category category3 = new Category();
    // category3.setCode("third");
    // category3.setDescription("房间面积：40平米。配有女仆两个、市话、长途服务、独立卫生间、淋浴、24小时热水、电视、空调。");
    // category3.setName("豪华双人间");
    // category3.setRoomprice(160);
    //
    // categoryService.save(category1);
    // categoryService.save(category2);
    // categoryService.save(category3);
    //
    // Category category01 = categoryService.getByCode("first");
    // Category category02 = categoryService.getByCode("second");
    // Category category03 = categoryService.getByCode("third");
    // for (int i = 1; i < 6; i++) {
    // Room room = new Room();
    // room.setCategory(category01);
    // room.setRoomNo("10" + i);
    // roomService.save(room);
    // }
    //
    // for (int i = 1; i < 6; i++) {
    // Room room = new Room();
    // room.setCategory(category02);
    // room.setRoomNo("20" + i);
    // roomService.save(room);
    // }
    //
    // for (int i = 1; i < 6; i++) {
    // Room room = new Room();
    // room.setCategory(category03);
    // room.setRoomNo("30" + i);
    // roomService.save(room);
    // }

    LinkWay l1 = new LinkWay();
    l1.setCity("南京市");
    l1.setAddress("江苏省南京市北京路1号");
    l1.setPhone("025-111111");

    LinkWay l2 = new LinkWay();
    l2.setCity("北京市");
    l2.setAddress("北京市上海路1号");
    l2.setPhone("010-111111");

    LinkWay l3 = new LinkWay();
    l3.setCity("上海市京");
    l3.setAddress("上海市南京路1号");
    l3.setPhone("021-111111");

    linkWayService.save(l1);
    linkWayService.save(l2);
    linkWayService.save(l3);
    return null;

  }
}
