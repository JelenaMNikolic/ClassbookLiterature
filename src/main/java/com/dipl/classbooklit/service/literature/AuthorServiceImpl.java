package com.dipl.classbooklit.service.literature;

import com.dipl.classbooklit.dao.AuthorRepository;
import com.dipl.classbooklit.dto.literature.AuthorDTO;
import com.dipl.classbooklit.entity.Author;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    @Transactional
    public List<AuthorDTO> findAll() {
        List<Author> authorEntities = authorRepository.findAll(Sort.by(Sort.Direction.DESC, "name"));
        return authorEntities.stream().map(Author::convertToBaseDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AuthorDTO findById(Long id) {
        Optional<Author> result = authorRepository.findById(id);
        AuthorDTO authorDTO = null;
        if (result.isPresent()) {
            authorDTO = result.get().convertToBaseDTO();
        } else {
            // there's no faculty with this ID
            throw new RuntimeException("There's no author with the id: " + id);
        }

        return authorDTO;
    }

    @Override
    @Transactional
    public void save(AuthorDTO authorDTO) {
        Author authorEntity = authorDTO.convertToDomainEntity();
        authorRepository.save(authorEntity);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        authorRepository.deleteById(id);
    }
}
