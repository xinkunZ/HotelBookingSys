package com.hotel.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "subscription")
public class Subscription implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;
  private String uuid;
  private Member member;
  private String orderNo;
  private Date startDate;
  private Date endDate;
  private String linkMan;
  private String linkManId;
  private String phoneNo;
  private Room room;
  private String status;// 可以不用
  private Date creTime;
  private String remark;// 可以不用
  private String category;// 仅页面用到
  private int withTicket;// 0 或 1 页面trigger获取
  private int daysNo;
  private double amount;
  @JsonIgnore
  private List<Reside> resides;

  @Id
  @Column(length = 38, nullable = false)
  @GeneratedValue(generator = "subscription-uuid")
  @GenericGenerator(name = "subscription-uuid", strategy = "uuid")
  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "memberId")
  public Member getMember() {
    return member;
  }

  public void setMember(Member member) {
    this.member = member;
  }

  public String getOrderNo() {
    return orderNo;
  }

  public void setOrderNo(String orderNo) {
    this.orderNo = orderNo;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }

  public String getLinkMan() {
    return linkMan;
  }

  public void setLinkMan(String linkMan) {
    this.linkMan = linkMan;
  }

  public String getPhoneNo() {
    return phoneNo;
  }

  public void setPhoneNo(String phoneNo) {
    this.phoneNo = phoneNo;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Date getCreTime() {
    return creTime;
  }

  public void setCreTime(Date creTime) {
    this.creTime = creTime;
  }

  public String getRemark() {
    return remark;
  }

  public void setRemark(String remark) {
    this.remark = remark;
  }

  @OneToOne(targetEntity = Room.class)
  @JoinColumn(name = "roomId")
  public Room getRoom() {
    return room;
  }

  public void setRoom(Room room) {
    this.room = room;
  }

  public String getLinkManId() {
    return linkManId;
  }

  public void setLinkManId(String linkManId) {
    this.linkManId = linkManId;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public int getWithTicket() {
    return withTicket;
  }

  public void setWithTicket(int withTicket) {
    this.withTicket = withTicket;
  }

  @OneToMany(mappedBy = "subscription", cascade = CascadeType.ALL)
  @JoinColumn(name = "subId")
  public List<Reside> getResides() {
    return resides;
  }

  public void setResides(List<Reside> resides) {
    this.resides = resides;
  }

  public int getDaysNo() {
    return daysNo;
  }

  public void setDaysNo(int daysNo) {
    this.daysNo = daysNo;
  }

  public double getAmount() {
    return amount;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }

}
