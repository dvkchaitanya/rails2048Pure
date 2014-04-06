require 'test_helper'

class SampleControllerTest < ActionController::TestCase
  test "should get dummy" do
    get :dummy
    assert_response :success
  end

end
