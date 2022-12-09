import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { Request, Response } from 'express';
import { ReadDiaryDto } from './dto/read-diary.dto';
import { DiaryDateDto } from './dto/diary-date.dto';

@Controller('diary')
@ApiTags('교환일기 API')
@ApiBearerAuth('access-token')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  @ApiOperation({
    summary: '교환일기 작성 API',
    description: 'content를 입력하여 새 교환일기를 생성한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  create(@Req() request: Request, @Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryService.create(request.user['userId'], createDiaryDto);
  }

  @Get()
  @ApiOperation({
    summary: '교환일기 목록 조회 API',
    description:
      '교환일기 목록을 조회한다. period에 아무 것도 입력하지 않으면 전체 조회, daily를 입력하면 일별 조회, monthly를 입력하면 월별 조회',
  })
  @UseGuards(AuthGuard('jwt'))
  async findDiaryList(
    @Req() request: Request,
    @Query() readDiaryDTO: ReadDiaryDto,
    @Res() response: Response,
  ) {
    const { period, date, month } = readDiaryDTO;
    if (period === 'daily') {
      const diaryList = await this.diaryService.findDiaryByDate(
        request.user['userId'],
        date,
      );
      if (diaryList === null || diaryList.diaries.length === 0) {
        return response.status(204).send();
      }
      return response.status(200).send(diaryList);
    } else if (period === 'monthly') {
      const diaryList = await this.diaryService.findDiaryByMonth(
        request.user['userId'],
        month,
      );
      if (diaryList === null || diaryList.diaries.length === 0) {
        return response.status(204).send();
      }
      return response.status(200).send(diaryList);
    } else {
      const diaryList = await this.diaryService.findDiaryList(
        request.user['userId'],
      );
      if (diaryList === null) {
        return response.status(204).send();
      }
      return response.status(200).send(diaryList);
    }
  }

  @Get('emotions')
  @ApiOperation({
    summary: '월단위 감점 API',
    description:
      'query로 year, month를 넣으면 해당 달의 일정이 있었던 날을 알려줌',
  })
  @UseGuards(AuthGuard('jwt'))
  emotions(@Req() request: Request, @Query() plannerDateDto: DiaryDateDto) {
    const userId = request.user['userId'];
    return this.diaryService.collectEmotions(userId, plannerDateDto);
  }
}
