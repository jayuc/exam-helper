package top.jayu.exam.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.jayu.exam.entry.Question;
import top.jayu.exam.mapper.QuestionMapper;
import top.jayu.exam.param.QuestionParam;
import top.jayu.exam.util.ResultUtil;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    QuestionMapper questionMapper;

    @PostMapping("/insert")
    public boolean insert(Question question){
        int result = questionMapper.insert(question);
        return result == 1;
    }

    @GetMapping("/selectAll")
    public List<Question> selectAll(){
        return questionMapper.selectAll();
    }

    @GetMapping("/selectById")
    public Question selectById(int id){
        return questionMapper.selectById(id);
    }

    // 根据参数查询数据
    @GetMapping("/selectSelective")
    public Map<String, Object> selectSelective(QuestionParam record){
        int pageNumber = record.getPageNumber();
        int pageSize = record.getPageSize();
        ResultUtil.Result result = ResultUtil.build();
        try{
            if(pageNumber > 0 && pageSize > 0){
                PageHelper.startPage(pageNumber, pageSize);
                Page<Question> pages = (Page<Question>) questionMapper.selectSelective(record);
                result.total(pages.getTotal());
                result.rows(pages.getResult());
            }else {
                List<Question> rows = questionMapper.selectSelective(record);
                result.rows(rows);
                result.total(rows.size());
            }
        }catch (Exception e){
            result.errorInfo(e.getMessage());
        }
        return result.getResult();
    }

}
