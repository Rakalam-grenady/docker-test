import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }


    async register(email: string, password: string) {
        const hashed = await bcrypt.hash(password, 10)

        const user = await this.prisma.user.create({
            data: { email, password: hashed },
        })

        return user
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } })

        if (!user) throw new UnauthorizedException()

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new UnauthorizedException()

        const payload = { userId: user.id, email: user.email, role: user.role, }

        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: '15m',
            }),
            refresh_token: this.jwtService.sign(payload, {
                expiresIn: '7d',
            }),
        }
    }

    async refresh(token: string) {
        try {
            const payload = this.jwtService.verify(token)

            return {
                access_token: this.jwtService.sign(
                    {
                        userId: payload.userId,
                        email: payload.email,
                        role: payload.role,
                    },
                    { expiresIn: '15m' },
                ),
            }
        } catch {
            throw new UnauthorizedException('Invalid refresh token')
        }
    }
}