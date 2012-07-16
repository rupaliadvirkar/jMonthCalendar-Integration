class EventsController < ApplicationController
  #This method will display all the events for the current month. 
  def index
    time_range = Date.civil(Time.now.year,Time.now.month,1)..Date.civil(Time.now.year,Time.now.month,-1)   
    find_events(time_range)
  end

  def get_events_for_the_given_month    
    time_cal = params[:time].to_time
    time_range = Date.civil(time_cal.year,time_cal.month,1)..Date.civil(time_cal.year,time_cal.month,-1)   
    find_events(time_range)
    render :partial => 'calendar'
  end

  def new
	render :partial => 'new'
  end
  
  def find_events(time_range)
    @events = Event.find(:all,:conditions=>{:begin_time => time_range})
  end
end
