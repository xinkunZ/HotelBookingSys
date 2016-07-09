package com.hotel.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 
 * @author L <br>
 *         Reside 意为居住情况 用于存放每个订单定义的时间范围所占用的房间号 <br>
 *         uuid 唯一id<br>
 *         subscription 对应的订单<br>
 *         resideDate 居住日期<br>
 */
@Entity
@Table(name = "reside")
public class Reside implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;
  private String uuid;
  private Subscription subscription;
  private Date resideDate;

  @Id
  @Column(length = 38, nullable = false)
  @GeneratedValue(generator = "reside-uuid")
  @GenericGenerator(name = "reside-uuid", strategy = "uuid")
  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "subId")
  public Subscription getSubscription() {
    return subscription;
  }

  public void setSubscription(Subscription subscription) {
    this.subscription = subscription;
  }

  public Date getResideDate() {
    return resideDate;
  }

  public void setResideDate(Date resideDate) {
    this.resideDate = resideDate;
  }

}
