package com.hotel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.dao.ResideDao;
import com.hotel.entity.Reside;

@Service
public class ResideService {

  @Autowired
  private ResideDao resideDao;

  @Transactional
  public Reside save(Reside reside) {
    return resideDao.save(reside);
  }

}
