package top.jayu.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.jayu.exam.entry.Question;
import top.jayu.exam.mapper.QuestionMapper;

import java.util.List;

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

}
