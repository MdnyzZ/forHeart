
//给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。

//示例 :

//输入: [1,2,1,3,2,5]
//输出: [3,5]








var singleNumber = function(nums) {
    var arr=[]
    for(var i = 0; i < nums.length; i++) {
        if (nums.indexOf(nums[i],i+1) != -1) {
            var tmp = nums[i];
            nums.splice(i,1);
            nums.splice(nums.indexOf(tmp),1);
            i--;
        }
    }
    return nums;
};
