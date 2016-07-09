package com.hotel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hd123.lab.ext.type.ExtResponse;
import com.hotel.entity.Room;
import com.hotel.pageform.QueryRoomCondition;
import com.hotel.pageform.RoomOptions;
import com.hotel.service.RoomService;

@Controller
@RequestMapping(value = "room", produces = "application/json;charset=utf-8")
public class RoomController {
  @Autowired
  private RoomService roomService;

  @RequestMapping(value = "/get")
  public @ResponseBody ExtResponse getRoom(@RequestBody QueryRoomCondition condition) {
    ExtResponse rsp = new ExtResponse();
    List<RoomOptions> roomOptionsList = roomService.getAvaliableRoomOptions(condition.getStartDate(),
        condition.getEndDate(), condition.getCategory());
    rsp.setData(roomOptionsList);
    return rsp;
  }

  @RequestMapping(value = "/query")
  public @ResponseBody ExtResponse queryRoom(@RequestBody QueryRoomCondition condition) {
    ExtResponse rsp = new ExtResponse();
    List<Room> data = roomService.queryRoom(condition);
    rsp.setData(data);
    return rsp;
  }
}
