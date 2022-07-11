import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FilesService } from './files.service';

@Controller()
export class FilesController {
  constructor (private readonly filesService: FilesService) {}

  @MessagePattern('createFile')
  create (@Payload() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @MessagePattern('findAllFiles')
  findAll () {
    return this.filesService.findAll();
  }

  @MessagePattern('findOneFile')
  findOne (@Payload() id: number) {
    return this.filesService.findOne(id);
  }

  @MessagePattern('updateFile')
  update (@Payload() updateFileDto: UpdateFileDto) {
    return this.filesService.update(updateFileDto.id, updateFileDto);
  }

  @MessagePattern('removeFile')
  remove (@Payload() id: number) {
    return this.filesService.remove(id);
  }
}
